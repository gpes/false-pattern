
package br.edu.ifpb.gpes.shared;

import java.util.List;

/**
 *
 * @author natan
 */
public class FalsePatternDetection {
    private List<FalsePattern> falsePatterns;

    public FalsePatternDetection() {
    }

    public FalsePatternDetection(List<FalsePattern> falsePatterns) {
        this.falsePatterns = falsePatterns;
    }

    public List<FalsePattern> getFalsePatterns() {
        return falsePatterns;
    }

    public void setFalsePatterns(List<FalsePattern> falsePatterns) {
        this.falsePatterns = falsePatterns;
    }

    @Override
    public String toString() {
        return "FalsePatternDetection{" + "falsePatterns=" + falsePatterns + '}';
    }
}
